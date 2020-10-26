module.exports = (qbo, ctx, cb) => {
  qbo.findAccounts(
    {
      AccountType: ctx.configuration.intuit_account_type,
      desc: 'MetaData.LastUpdatedTime',
      limit: 5,
      offset: 5,
    },
    (err, accounts) => {
      if (err) {
        console.log(err.Fault.Error);
        cb(err);
      } else {
        cb(null, { body: accounts });
      }
    }
  );
};
