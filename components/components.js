const model = require("../model/model")

const getalltask = async (req, res) => {
  try {
    const task = await model.find({});
    res.status(200).json({ task })
  } catch (error) {
    console.log(error);
  }
}

const posttask = async (req, res) => {
  try {
    const task = await model.create(req.body);
    res.status(201).json({ task })
  } catch (error) {
    console.log(error);
  }
}

const deletetask = async (req, res) => {
  try {
    const task = await model.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ task })
  } catch (error) {
    console.log(error);
  }
}

const patchtask = async (req, res) => {
  try {
    const task = await model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
    res.status(201).json({ task })
  } catch (error) {
    console.log(error);
  }
}

const deletealltask = async (req , res) => {
    try {
      const task = await model.deleteMany();
      res.status(200).json({task})
    } catch (error) {
      console.log(error);
    }
}

module.exports = { getalltask, posttask, deletetask, patchtask , deletealltask }