"use strict";var jwt=require("jsonwebtoken");function restrict(){var o=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"normal";return function(r,n,s){var a,t;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:if(a={message:"Invalid credentials"},e.prev=1,t=r.cookies.token){e.next=5;break}return e.abrupt("return",n.status(401).json(a));case 5:jwt.verify(t,process.env.JWT_SECRET||"La vida es sueño",function(e,t){if(e||t.userRole!==o)return n.status(401).json(a);r.token=t,s()}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),s(e.t0);case 11:case"end":return e.stop()}},null,null,[[1,8]])}}module.exports=restrict;