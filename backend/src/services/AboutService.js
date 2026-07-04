class AboutService {
  async getAboutData() {
    return {
      title: "BEST DIGITAL STORE BASICSTORE",
      paragraphs: [
        "Risus augue curabitur diam senectus congue velit et. Sed vitae metus nibh sit era. Nulla adipiscing pharetra pellentesque maecenas odio eros et. Et libero vulputate amet duis erat volutpat vitae eget. Sed vitae metus nibh sit era. Nulla adipiscing pharetra eros et.",
        "Nulla adipiscing pharetra pellentesque maecenas odio eros et. Et libero vulputate amet duis erat volutpat vitae eget. Quam libero etiam et in ac at quis. Risus augue curabitur diam senectus congue velit et."
      ],
      promoImage: "/promo.png"
    };
  }
}

module.exports = new AboutService();
