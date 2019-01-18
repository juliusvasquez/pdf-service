export default {
  getServerHealth: (req, res) => {
    res.send({
      status: 'OK',
    });
  },
};
