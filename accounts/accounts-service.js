module.exports = {
    isValid,
  };
  
  function isValid(account) {
    return Boolean(account.accountname && account.password && typeof account.password === "string");
  }
  