import products from '../models/products.js'

export const createProduct = async (req, res) => {
  try {
    const imagePath = []

    if (req.files.image) {
      req.files.image.forEach(item => {
        imagePath.push(item.path)
      })
    }

    if (typeof req.body.image === 'string') {
      imagePath.push(req.body.image)
    }

    if (typeof req.body.image === 'object') {
      req.body.image.forEach(item => {
        if (item !== '' && item !== undefined && item !== null) {
          imagePath.push(item)
        }
      })
    }

    const result = await products.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: [...imagePath],
      // image: req.files?.image[0].path,
      quantity: req.body.quantity,
      sell: req.body.sell,
      category: req.body.category
      // category: []
    })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getSellProducts = async (req, res) => {
  try {
    const result = await products.find({ sell: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllProducts = async (req, res) => {
  try {
    // 給管理員看的 所以 find() 空值
    const result = await products.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

// 取單個 product
export const getProduct = async (req, res) => {
  try {
    // findById  取路由的id =>req.params.id
    const result = await products.findById(req.params.id)
    if (!result) {
      // 如果沒有東西的話回傳 404
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const editProduct = async (req, res) => {
  try {
    // const image = req.files?.image ? req.files?.image[0].path : req.body.image
    const imagePath = []

    if (req.files.image) {
      req.files.image.forEach(item => {
        imagePath.push(item.path)
      })
    }

    if (typeof req.body.image === 'string') {
      imagePath.push(req.body.image)
    }

    if (typeof req.body.image === 'object') {
      req.body.image.forEach(item => {
        if (item !== '' && item !== undefined && item !== null) {
          imagePath.push(item)
        }
      })
    }

    const result = await products.findByIdAndUpdate(
      // req.路由參數 的 id
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: [...imagePath],
        // image: req.files?.image ? req.files.image[0].path : req.body.image,
        // image: req.file?.path,
        // 空值拿掉不然沒上船時圖片會不見
        quantity: req.body.quantity,
        category: req.body.category,
        sell: req.body.sell
        // category: []
      },
      // 更新找不到資料就直接建立一筆新的 upsert: true
      { new: true }
    )
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
      console.log(error)
    }
  }
}
