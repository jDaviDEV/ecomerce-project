import { ICategory } from '../../../domain/interfaces/categoryInterface'
import { IInventory, updatedInventoryInfo } from '../../../domain/interfaces/inventoryInterface'
import { IProduct, updatedProductInfo } from '../../../domain/interfaces/productInterface'
import { categoryModel } from '../../../domain/models/dbCategoryModels'
import { InventoryModel } from '../../../domain/models/dbInventoryModels'
import { ProductModel } from '../../../domain/models/dbProductModels'

export async function addNewCategory (newCategoryInfo: ICategory): Promise<undefined> {
  try {
    // the addToSet property adds a new item to the array not allowing duplicates
    await categoryModel.updateOne({}, { $addToSet: { categories: newCategoryInfo.categories } }, { upsert: true })
  } catch (error) {
    console.log(error)
    throw new Error('Cannot enter these categories, something went wrong')
  }
}

export async function addNewProductToInventory (newProductInfo: IInventory): Promise<undefined> {
  try {
    const newProduct = new InventoryModel(newProductInfo)
    await newProduct.save()
  } catch (error) {
    console.log(error)
    throw new Error('Cannot register this product in the inventory, something went wrong')
  }
}

export async function getAllCategories (): Promise<ICategory> {
  try {
    // .lean() to get plain javascript object and .select to get rid of the two keys that mongodb creates
    const data = await categoryModel.find().lean().select('-__v -_id')
    return data[0]
  } catch (error) {
    console.log(error)
    throw new Error('Cannot fetch all categories')
  }
}

export async function getAllProductsFromInventory (): Promise<IInventory[]> {
  try {
    // .lean() to get plain javascript object and .select to get rid of the two keys that mongodb creates
    const data = await InventoryModel.find().lean().select('-__v -_id')
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Cannot fetch all products from inventory')
  }
}

export async function getAllProducts (): Promise<IProduct[]> {
  try {
    // .lean() to get plain javascript object and .select to get rid of the two keys that mongodb creates
    const data = await ProductModel.find().lean().select('-__v -_id')
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Cannot fetch all products')
  }
}

export async function deleteCategory (categoryName: string): Promise<undefined> {
  try {
    await categoryModel.updateOne({}, { $pull: { categories: categoryName } })
  } catch (error) {
    console.error(error)
    throw new Error('Cannot remove this category, something went wrong')
  }
}

export async function registerNewProduct (newProductInfo: IProduct): Promise<undefined> {
  try {
    const newProduct = new ProductModel(newProductInfo)
    await newProduct.save()
  } catch (error) {
    console.log(error)
    throw new Error('Cannot register this product, something went wrong')
  }
}

export async function updateProductInfo (updatedProductInfo: updatedProductInfo, productId: string): Promise<undefined> {
  try {
    await ProductModel.updateOne({ productId }, updatedProductInfo)
  } catch (error) {
    console.log(error)
    throw new Error('It\'s not possible to update this product information')
  }
}

export async function deleteProduct (productId: string): Promise<undefined> {
  try {
    await ProductModel.deleteOne({ productId })
  } catch (error) {
    console.log(error)
    throw new Error('It\'s not possible to delete this product')
  }
}

export async function deleteProductInInventory (productId: string): Promise<undefined> {
  try {
    await InventoryModel.deleteOne({ productId })
  } catch (error) {
    console.log(error)
    throw new Error('It\'s not possible to delete this product from the inventory')
  }
}

export async function updateInventoryProduct (updatedInventoryProduct: updatedInventoryInfo, productId: string): Promise<undefined> {
  try {
    await ProductModel.updateOne({ productId }, updatedInventoryProduct)
  } catch (error) {
    console.log(error)
    throw new Error('It\'s not possible to update this product information in inventory')
  }
}
