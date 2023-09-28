const { User } = require("../../schemas");
const { firebase } = require("../../config");
const { config: { SESSION_NAME, SESSION_TIME } } = require('../../config');
const {
  handlerSendEmailVerify,
  handlerDateFinishSession,
  handlerTokenIdSession } = require("../../handlers");

const authSignIn = async (req, res) => {
  try {
    const user = req.body;

    let userSnkrs = await User.findOne({ email: user.email });

    if (userSnkrs === null && user.providerId !== '') {
      const userDB = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.photoUrl,
        email: user.email,
        status: 'active',
      });
      userSnkrs = await userDB.save();
    }

    if (userSnkrs) {
      if (userSnkrs && userSnkrs.status === 'active') {

        req.session.auth = {
          User_id: userSnkrs._id,
          firstName: userSnkrs.firstName,
          lastName: userSnkrs.lastName,
          email: userSnkrs.email,
          image: userSnkrs.image,
          role: userSnkrs.role
        }
        req.session.save(async (err) => {
          if (err) {
            return res.status(500).json({ message: 'Error al guardar la sesión.' });
          }

          await firebase.auth().setCustomUserClaims(user.localId, req.session.auth);

          let token;
          try {
            token = await firebase.auth().createSessionCookie(user.idToken, {
              expiresIn: parseInt(SESSION_TIME * 60 * 1000),
            });

            const options = { maxAge: SESSION_TIME * 60 * 1000, httpOnly: true };

            const id_session = req.sessionID
            const expires = await handlerDateFinishSession(id_session)

            res.setHeader(SESSION_NAME, handlerTokenIdSession(id_session));
            res.cookie(SESSION_NAME, token, options)

            return res.status(200).json({
              _id: handlerTokenIdSession(id_session),
              expires: expires,
              ...req.session.auth
            })

          } catch (error) {
            return res.status(500).json({ message: 'Error al generar el token de sesión.' });
          }
        });

      } else if (userSnkrs.status === 'inactive') {
        await handlerSendEmailVerify(user);
        return res.status(200).json({ message: 'A verification email has been sent!' });
      } else {
        return res.status(400).json({ message: 'Contact the page administrator.' });
      }
    } else {
      return res.status(404).json({ message: 'User not signup' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error en la autenticación del usuario.' });
  }
};

module.exports = authSignIn;