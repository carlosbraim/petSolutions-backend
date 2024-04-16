const jwt = require('jsonwebtoken');

const hash = '@pethash';

const secretKey = hash;

function verifyToken(req, res, next) {
  try {
      let token;

      if(req.params.token){
        token = req?.params?.token?.replace(/Bearer /gi, '');
      }else{
        token = req?.headers?.authorization?.replace(/Bearer /gi, '');
      }

      const decoded = jwt.verify(token, secretKey);
      if (decoded.exp < Date.now() / 1000) {
          return res.status(401).json({token: false, mensagem: 'Token expirado.' });
      }
      if (!token) {
        return res.status(401).json({token: false, mensagem: 'Token não fornecido.' });
      }
      req.user = decoded.user;
      next();
    } catch (err) {
      return res.status(401).json({token: false, mensagem: 'Token inválido.' });
    }
  }

module.exports = { 
    secretKey,
    verifyToken
};