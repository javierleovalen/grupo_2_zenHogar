const devController = {
  index : function (req,res) {
    res.render('./dev/index')
  },
  home: function (req, res) {
    res.render('./dev/home')
  }
};

module.exports = devController;