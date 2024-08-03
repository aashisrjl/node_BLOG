exports.errorHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => {
            return res.status(500).json({
                message: "server/internal error",
                errMessage: err.message
            });
        });
    };
};

