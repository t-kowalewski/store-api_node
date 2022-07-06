## Store API

Allows users to request demo products from database.  
Supports search/filtering (including numeric filters), sorting, selecting only specified fields and pagination.

### Usage

**Main endpoint:** _GET_ `localhost:3000/api/v1/products`

```
{
    "items": 1,
    "products": [
        {
            "_id": "62b45a60051b69437436c91f",
            "featured": false,
            "name": "albany sectional",
            "price": 109,
            "rating": 5,
            "company": "liddy",
            "createdAt": "2022-06-23T12:19:42.108Z",
            "__v": 0
        }
    ]
}
```

\
**Search/filtering**

_GET_ `localhost:3000/api/v1/products?name=dining+table`\
_GET_ `localhost:3000/api/v1/products?company=ikea`\
_GET_ `localhost:3000/api/v1/products?featured=true`\
\
**Numeric Filters** ( can be used with `>`, `<`, `=`, `>=`, `<=` )

_GET_ `localhost:3000/api/v1/products?numericFilters=price>40,rating>=4`\
\
**Sorting**

_GET_ `localhost:3000/api/v1/products?sort=name,price`\
\
**Output only selected fields**

_GET_ `localhost:3000/api/v1/products?fields=name,price`\
\
**Pagination**

_GET_ `localhost:3000/api/v1/products?page=1&limit=5`
