# Services

## Stripe

After creating your account, create the product "subscription" with at least name and price.

## FaunaDB

For FaunaDB you need to create Collections and Indexes:

1. Collections
   ```javascript
   {
      name: "subscriptions",
      history_days: 30,
      ttl_days: null
   }
   
   {
      name: "users",
      history_days: 30,
      ttl_days: null
   }
   ```

2. Indexes
   ```javascript
   {
      name: "subscription_by_id",
      unique: false,
      serialized: true,
      source: "subscriptions",
      terms: [
        {
          field: ["data", "id"]
        }
      ]
    }
   
   {
      name: "subscription_by_status",
      unique: false,
      serialized: true,
      source: "subscriptions",
      terms: [
        {
          field: ["data", "status"]
        }
      ]
    }
    
    {
      name: "subscription_by_user_ref",
      unique: false,
      serialized: true,
      source: "subscriptions",
      terms: [
        {
          field: ["data", "userId"]
        }
      ]
    }
    
    {
      name: "user_by_email",
      unique: true,
      serialized: true,
      source: "users",
      terms: [
        {
          field: ["data", "email"]
        }
      ]
    }
    
    {
      name: "user_by_stripe_customer_id",
      unique: false,
      serialized: true,
      source: "users",
      terms: [
        {
          field: ["data", "stripe_customer_id"]
        }
      ]
    }
   ```
   
## Prismic CMS

After creating your repository go to the "Custom Types" tab, add a new one with the following settings:

Type: Repeatable Type

Name: post

Fields:
- UID
- Title as H1
- RichText (allow multiple paragraphs and blank for links)

In "Documents" tab it will be possible to add the posts, save and upload.
