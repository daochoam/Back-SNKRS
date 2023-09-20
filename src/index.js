const app = require("./app");
const {
    db,
    config: { PORT }
} = require("./config");

app.listen(PORT, () => {
    db();
    console.log(`Server on port: http://localhost:${PORT}`);
});