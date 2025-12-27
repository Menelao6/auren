// // sanity.config.ts
// import { defineConfig } from 'sanity'
// import { deskTool } from 'sanity/desk'
// import { productSchema } from './sanity/schemaTypes/product'
// import { categorySchema } from './sanity/schemaTypes/category'

// export default defineConfig({
//   name: 'auren-store',
//   title: 'Auren Store',
//   projectId: 'ewywg88w',
//   dataset: 'auren1',  // Your new dataset
//   plugins: [deskTool()],
//   schema: {
//     types: [productSchema, categorySchema], // Only these schemas!
//   },
// })


import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {schemaTypes} from './sanity/schemaTypes'

export default defineConfig({
  name: 'auren-store',
  title: 'Auren Store',
  projectId: 'ewywg88w',
  dataset: 'auren1',  // Your new dataset
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) => S.list().title('Content').items([
        // Your structure items here
        S.listItem()
          .title('Product')
          .schemaType('product')
          .child(S.documentTypeList('product'))
      ]),
    }),
    visionTool(),
    codeInput(),     
  ],
  schema: {
    types: schemaTypes,
  },
})
