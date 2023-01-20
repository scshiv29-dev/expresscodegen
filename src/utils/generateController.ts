const code = (ModelName: String) => {
        const wholeCode = `

    // Store model in request object
    router.param('id', async (req, res, next, id) => {
        try {
            req.model = await ${ModelName}.findById(id);
            if (!req.model) return res.status(404).json({ message: '${ModelName} not found' });
            next();
        } catch (err) {
            res.status(500).json({ message: 'Failed to get model', error: err });
        }
    });

    // Create function
    router.post('/', async (req, res) => {
        try {
            const data = req.body;
            const model = new ${ModelName}(data);
            await model.save();
            res.status(201).json({ message: 'Successfully created model' });
        } catch (err) {
            res.status(500).json({ message: 'Failed to create model', error: err });
}
});
// Get function
router.get('/:id', (req, res) => {
    res.status(200).json({ data: req.model });
});

// Get All function
router.get('/', async (req, res) => {
    try {
        const models = await ${ModelName}.find();
        res.status(200).json({ data: models });
    } catch (err) {
        res.status(500).json({ message: 'Failed to get models', error: err });
    }
});

// Update function
router.put('/:id', async (req, res) => {
    try {
        const data = req.body;
        Object.assign(req.model, data);
        await req.model.save();
        res.status(200).json({ data: req.model });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update model', error: err });
    }
});

// Remove function
router.delete('/:id', async (req, res) => {
    try {
        await req.model.remove();
        res.status(200).json({ message: 'Successfully deleted model' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete model', error: err });
    }
});

module.exports = router;




`
        return wholeCode
}
export const generateControllerAndRoutes = (ModelName: String) => {
        const codeToWrite = code(ModelName)
        return codeToWrite

}