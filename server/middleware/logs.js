export const logRequest = (req, res, next) => {
  console.log('Terjadi Request di PATH : ', req.path)
  next()
}
