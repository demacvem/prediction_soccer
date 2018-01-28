module.exports = {
    PORT: process.env.PORT || '3000',
    DB: process.env.MONGODB || 'mongodb+srv://prediction-soccer:<predictionsoccer>@node-prediction-soccer-knvhs.mongodb.net/test',
    DBLOCAL: 'mongodb://127.0.0.1:27017/predictionsoccer',
    SECRET_TOKEN: 'miclacedetoken' 
}