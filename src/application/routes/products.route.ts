import { Router, Request, Response } from 'express'
import * as productServices from '../controllers/services/productServices.ts'
import { ICategory } from '../../domain/interfaces/categoryInterface.ts'
import { IProduct, updatedProductInfo } from '../../domain/interfaces/productInterface.ts'
import { IInventory, updatedInventoryInfo } from '../../domain/interfaces/inventoryInterface.ts'
const productsRouter: Router = Router()

productsRouter.get('/products/catalog', async (_req: Request, res: Response) => {
  const data = await productServices.getAllProducts()
  res.status(200).send(data)
})

productsRouter.post('/products/catalog', async (req: Request, res: Response) => {
  const newProductInfo: IProduct = req.body
  await productServices.registerNewProduct(newProductInfo)
  res.status(201).send(`New producto register: ${JSON.stringify(newProductInfo)}`)
})

productsRouter.patch('/products/catalog/:productId', async (req: Request, res: Response) => {
  const productId: string = req.params.productId
  const updatedProductInfo: updatedProductInfo = req.body
  await productServices.updateProductInfo(updatedProductInfo, productId)
  res.status(200).send(`The product information has been updated with: ${JSON.stringify(updatedProductInfo)}`)
})

productsRouter.delete('/products/catalog/:productId', async (req: Request, res: Response) => {
  const productId: string = req.params.productId
  await productServices.deleteProduct(productId)
  res.status(200).send(`The product with id: ${productId} has been deleted`)
})

productsRouter.get('/products/categories', async (_req: Request, res: Response) => {
  const data = await productServices.getAllCategories()
  res.status(200).send(data)
})

productsRouter.post('/products/categories', async (req: Request, res: Response) => {
  const newCategoryInfo: ICategory = req.body
  await productServices.addNewCategory(newCategoryInfo)
  res.status(201).send(`New categories: [${newCategoryInfo.categories.join(', ')}] as been added to the database`)
})

productsRouter.delete('/products/categories/:categoryName', async (req: Request, res: Response) => {
  const categoryName = req.params.categoryName
  await productServices.deleteCategory(categoryName)
  res.status(200).send(`Category: ${categoryName} has been deleted`)
})

productsRouter.get('/products/inventory', async (_req: Request, res: Response) => {
  const data = await productServices.getAllProductsFromInventory()
  res.status(200).send(data)
})
productsRouter.post('/products/inventory', async (req: Request, res: Response) => {
  const newProduct: IInventory = req.body
  await productServices.addNewProductToInventory(newProduct)
  res.status(201).send(`The product with id: ${newProduct.productId} has been added to the inventory`)
})

productsRouter.patch('/products/inventory/:productId', async (req: Request, res: Response) => {
  const productId: string = req.params.productId
  const updatedInventoryInfo: updatedInventoryInfo = req.body
  await productServices.updateInventoryProduct(updatedInventoryInfo, productId)
  res.status(200).send(`The product information in inventory has been changed: ${JSON.stringify(updatedInventoryInfo)}`)
})

productsRouter.delete('/products/inventory/:productId', async (req: Request, res: Response) => {
  const productId: string = req.params.productId
  await productServices.deleteProductInInventory(productId)
  res.status(200).send(`The product with id: ${productId} has been deleted from the inventory`)
})

export default productsRouter
