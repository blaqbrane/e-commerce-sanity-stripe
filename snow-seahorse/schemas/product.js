export default {
    //name:'product' is the name of the collection of what we are adding into our new document,
    //with a title of "Product", "type" show the type of data we are dealing with, which can be string,document e.t.c
    //the "fields" decribes what is contained in each of our 'product', which includes "image","name","slug","price" 
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'image',
        title: 'Image',
        type: 'array',
        of:[{type:'image'}],
        options:{
            hotspot:true,
        }
      },
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options:{
            source: 'name',
            maxLength: 90,
        }
      },
      {
        name : 'price',
        title: 'Price',
        type:'number'
      },
      {
        name: 'details',
        title: 'Details',
        type: 'string'
      }
    ]
  }