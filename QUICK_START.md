# Subhan Arts - Quick Start Guide

## Welcome! 🎉

Your Subhan Arts e-commerce platform is ready to go. Follow these steps to get started.

## 1️⃣ Development Setup (Optional)

If you want to run the project locally:

```bash
cd e-commerce
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 2️⃣ Access Admin Panel

1. Go to `/admin-login`
2. Use your admin credentials to log in
3. Access the admin dashboard

## 3️⃣ Add Your First Product

### Via Admin Panel:
1. Login to admin dashboard
2. Click "Products" in the sidebar
3. Click "Add New Product"
4. Fill in:
   - **Product Name**: e.g., "Premium Cotton T-Shirt"
   - **Category**: Select from existing or create new
   - **Price**: Enter price in PKR (e.g., 1500)
   - **Description**: Add product details
   - **Image**: Upload from assets (images 1-8) via imgbb
5. Click "Add Product"

### Product Images Available:
- `1.png` through `8.png` in `/src/assets/images`
- Use these images for your products

## 4️⃣ Customize Categories

1. Go to "Categories" in admin panel
2. Click "Add Category"
3. Enter category name (e.g., "T-Shirts", "Jeans", "Formal Wear")
4. Assign products to categories

## 5️⃣ View Orders

1. Go to "Orders" in admin panel
2. View customer orders with contact information
3. Manage order status

## 6️⃣ Styling & Colors

**Main Colors**:
- Primary Blue: `#2563eb`
- Dark Blue: `#1e40af`
- White Background
- Gray Text: `#111827`

All components are pre-styled. To customize:

Edit `/src/style.css` for global styles
Edit individual component files in `/src/components`

## 7️⃣ Key Features

✅ **No Customer Login Required**
- Customers can shop without creating accounts
- Cart works with session storage

✅ **Product Management**
- Add/edit/delete products from admin panel
- Organize by category
- Upload images via imgbb

✅ **Simple Checkout**
- Minimal form fields required
- Fast order placement
- Order confirmation

✅ **Professional Design**
- White and blue color scheme
- Fully responsive
- Mobile-friendly

## 8️⃣ File Locations

- **Components**: `/src/components`
- **Pages**: `/src/pages`
- **Admin Pages**: `/src/pages/admin`
- **Images**: `/src/assets/images`
- **Styles**: `/src/style.css` & Tailwind CSS classes

## 9️⃣ Deployment (Vercel)

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel deploy
```

See `DEPLOY.md` for detailed instructions.

## 🔟 Important Notes

1. **Environment Variables**: Ensure `.env` has Firebase credentials
2. **Firebase**: All data stored in Firestore database
3. **Images**: Use imgbb API for product uploads
4. **Admin Auth**: Stored in localStorage (change password for security)

## 📱 Test the Platform

1. **Browse Products**: Visit home page
2. **Filter by Category**: Use filter in products section
3. **Add to Cart**: Click product cards
4. **Checkout**: Go to cart and place order
5. **View Admin**: Login and manage products

## ❓ Need Help?

- Check `SUBHAN_ARTS_GUIDE.md` for detailed documentation
- Review component files for specific functionality
- Check Firebase console for database issues

## 🚀 You're Ready!

Your Subhan Arts e-commerce platform is fully functional. Start adding products and take orders!

**Happy Selling! 🛍️**

---

For detailed documentation, see:
- `SUBHAN_ARTS_GUIDE.md` - Complete brand guide
- `DEPLOY.md` - Deployment instructions
- `README.md` - Technical documentation
