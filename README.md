# Inventory Control

Develop a react-native application with NodeJs server for inventory control with the following features:

- CRUD product category with the following fields:
	- Code: int
	- Description: string
- CRUD product with the following fields:
	- Code: int
	- Description: string
	- Category: int (allow to select based on the pre-registered categories)
	- Quantity in stock: int
	- Minimum Stock: int
	- Active (yes/no): boolean
- All fields are required in both registrations.
- Confirm before deleting records
- View all registered products, with option to sort by: code, description and quantity in stock
- An option to filter the displaying products: active / inactive / all
- An option to list all products that have the quantity in stock less than or equal to the minimum
- Display an alert (in the form of an icon) on the main screen of the app whenever there are products with inventory equal to or below the minimum and when clicked, display to the user the products that are in this condition.
