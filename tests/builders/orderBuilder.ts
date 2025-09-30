// BUILDER PATTERN FOR ORDER DATA
// How to use this file:
// 1. Use the OrderBuilder class to create order objects for your tests.
// 2. Call methods to set customer details, add items, etc.
// 3. Call build() to get the final order object.

// Example usage in a test:
// const builder = new OrderBuilder();
// builder.setCustomerDetails({ ... });
// builder.addItem({ ... });
// const order = builder.build();

// Start implementing below:
export class OrderBuilder {
	// Store order data here
	private customerDetails: any = {};
	private items: any[] = [];

	// Set customer details
	setCustomerDetails(details: any) {
		// details should be an object with name, email, address, etc.
		this.customerDetails = details;
		return this; // allows chaining
	}

	// Add an item to the order
	addItem(item: any) {
		// item should be an object with productId, quantity, etc.
		this.items.push(item);
		return this; // allows chaining
	}

	// Build the final order object
	build() {
		// Return the order object in the format your API expects
		return {
			customerDetails: this.customerDetails,
			items: this.items
		};
	}
}

// You can add more methods for other order fields if needed.
// This file will contain a Builder class for creating order data
// The Builder pattern helps you create complex objects step by step
// Example:
// class OrderBuilder {
//   // Add properties for order details here
//   // Add methods to set each property
//   // Add a build() method to return the final order object
// }

// Start by defining the class and add methods for each field you need
