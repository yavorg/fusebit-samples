module.exports = async (successFactors, ctx) => {
  const Candidate = successFactors.Candidate;
  const candidates = await Candidate.requestBuilder()
    .getAll()
    .top(20)
    .select(Candidate.FIRST_NAME, Candidate.LAST_NAME)
    .withCustomHeaders({
      apikey: ctx.configuration.api_key,
    })
    .execute({
      url: ctx.configuration.url,
    });

  return { body: candidates };
};
