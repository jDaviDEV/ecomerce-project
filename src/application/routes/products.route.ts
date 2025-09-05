import { Router, Request, Response } from 'express'

const productsRouter: Router = Router()

productsRouter.get('/products/catalog', (_req: Request, res: Response) => {
  res.json(
    {
      results: [
        {
          productId: 'prd_001',
          name: 'Smartphone XYZ',
          description: 'Pantalla 6.5 pulgadas, 128GB',
          price: 599.99,
          currency: 'USD',
          stock: 24,
          category: 'electronics',
          imageUrl: 'https://something.funny.com/prd_01.jpg'
        },
        {
          productId: 'prd_002',
          name: 'Tv',
          description: 'Pantalla 32 pulgadas, 4k',
          price: 2000,
          currency: 'USD',
          stock: 12,
          category: 'electronics',
          imageUrl: 'https://something.funny.com/prd_02.jpg'
        }
      ]
    }
  )
})
productsRouter.patch('/products/catalog/:productId', (_req: Request, _res: Response) => {})
productsRouter.delete('/products/catalog/:productId', (_req: Request, _res: Response) => {})

productsRouter.get('/products/categories', (_req: Request, _res: Response) => {})
productsRouter.post('/products/categories', (_req: Request, _res: Response) => {})
productsRouter.delete('/products/categories/:categoryName', (_req: Request, _res: Response) => {})

productsRouter.get('/products/inventory', (_req: Request, _res: Response) => {})
productsRouter.post('/products/inventory', (_req: Request, _res: Response) => {})
productsRouter.patch('/products/inventory/:productId', (_req: Request, _res: Response) => {})
productsRouter.delete('/products/inventory/:productId', (_req: Request, _res: Response) => {})

export default productsRouter
