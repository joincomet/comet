module.exports = () => {
  return {
    twitterCard: [
      // They receive as parameter:
      // - `htmlDom`: the cheerio HTML instance.
      // - `url`: The input URL used for extact the content.
      ({ htmlDom: $, url }) => $('meta[name="twitter:card"]').attr('content'),
      ({ htmlDom: $, url }) =>
        $('meta[property="twitter:card"]').attr('content')
    ]
  }
}
