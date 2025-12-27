import { faker } from '@faker-js/faker';
import { PrismaClient, ProductStatus } from '../generated/prisma';

import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

/* ======================================================
   PRISMA SETUP (KEEP AS IS)
====================================================== */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

/* ======================================================
   CONSTANTS
====================================================== */
const USER_ID = '00975af2-19f4-4ed8-b517-c877af1819f8';
const USER_EMAIL = 'khuongtran227@gmail.com';
const DEFAULT_PHONE = '0901234567';

/* ======================================================
   MAIN
====================================================== */
async function main() {
  console.log('🔥 Clearing old business data (keeping main user)');

  /* =======================
     CLEAR DATA (SAFE ORDER)
  ======================= */
  await prisma.notification.deleteMany({
    where: { userId: { not: USER_ID } },
  });

  await prisma.orderProduct.deleteMany();
  await prisma.order.deleteMany({
    where: { userId: { not: USER_ID } },
  });

  await prisma.cartItem.deleteMany({
    where: { userId: { not: USER_ID } },
  });

  await prisma.address.deleteMany({
    where: { userId: { not: USER_ID } },
  });

  await prisma.ratingDistribution.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  await prisma.user.deleteMany({
    where: { id: { not: USER_ID } },
  });

  /* =======================
     USER (ADMIN)
  ======================= */
  console.log('🌱 Seeding admin user');

  const user = await prisma.user.upsert({
    where: { id: USER_ID },
    update: {
      isAdmin: true,
      isEmployee: false,
    },
    create: {
      id: USER_ID,
      email: USER_EMAIL,
      firstName: 'Khuong',
      lastName: 'Tran',
      phone: DEFAULT_PHONE,
      profileImage: faker.image.avatar(),
      walletBalance: 0,
      isAdmin: true,
      isEmployee: false,
    },
  });

  /* =======================
     EMPLOYEES
  ======================= */
  console.log('🌱 Seeding employee users');

  await prisma.user.createMany({
    data: [
      {
        email: 'callcenter@shop.com',
        firstName: 'Call',
        lastName: 'Center',
        phone: '0911111111',
        isEmployee: true,
        employeeRole: 'CALL_CENTER',
      },
      {
        email: 'warehouse@shop.com',
        firstName: 'Warehouse',
        lastName: 'Staff',
        phone: '0922222222',
        isEmployee: true,
        employeeRole: 'WARE_HOUSE',
      },
    ],
  });

  /* =======================
     ADDRESS
  ======================= */
  console.log('🌱 Seeding addresses');

  await prisma.address.createMany({
    data: [
      {
        userId: user.id,
        address: '123 Nguyen Trai Street, District 1, Ho Chi Minh City',
      },
      {
        userId: user.id,
        address: '456 Le Loi Boulevard, District 3, Ho Chi Minh City',
      },
    ],
  });

  /* =======================
     CATEGORY
  ======================= */
  console.log('🌱 Seeding categories');

  const categories = await Promise.all(
    ['Men Fashion', 'Electronics', 'Home & Living', 'Sports', 'Accessories'].map((title) =>
      prisma.category.create({
        data: {
          title,
          slug: faker.helpers.slugify(title).toLowerCase(),
          description: faker.commerce.productDescription(),
          featured: faker.datatype.boolean(),
          imageUrl: faker.image.urlLoremFlickr({ category: 'product' }),
        },
      }),
    ),
  );

  /* =======================
     BRANDS
  ======================= */
  const brands = await Promise.all(
    ['Nike', 'Adidas', 'Apple', 'Samsung', 'Sony'].map((name) =>
      prisma.brand.create({
        data: {
          name,
          slug: name.toLowerCase(),
          imageUrl: faker.image.urlLoremFlickr({ category: 'logo' }),
        },
      }),
    ),
  );

  /* =======================
     PRODUCT
  ======================= */
  console.log('🌱 Seeding products');

  const products: Awaited<ReturnType<typeof prisma.product.create>>[] = [];

  for (let i = 0; i < 20; i++) {
    const product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        slug: faker.helpers.slugify(faker.commerce.productName()).toLowerCase(),
        brandId: faker.helpers.arrayElement(brands).id,
        description: faker.commerce.productDescription(),
        price: faker.number.int({ min: 200_000, max: 6_000_000 }),
        discount: faker.number.int({ min: 0, max: 40 }),
        stock: faker.number.int({ min: 0, max: 100 }),
        status: faker.helpers.arrayElement([
          ProductStatus.NEW,
          ProductStatus.HOT,
          ProductStatus.SALE,
          ProductStatus.FEATURED,
          ProductStatus.OUT_OF_STOCK,
          ProductStatus.DISCONTINUED,
          ProductStatus.PREORDER,
        ]),
        isFeatured: faker.datatype.boolean(),
        averageRating: faker.number.int({ min: 3, max: 5 }),
        totalReviews: faker.number.int({ min: 10, max: 500 }),
        categoryId: faker.helpers.arrayElement(categories).id,
        userId: user.id,
      },
    });

    products.push(product);

    await prisma.productImage.createMany({
      data: Array.from({ length: 3 }).map(() => ({
        productId: product.id,
        url: faker.image.urlLoremFlickr({ category: 'product' }),
        alt: product.name,
      })),
    });

    await prisma.ratingDistribution.create({
      data: {
        productId: product.id,
        fiveStars: faker.number.int({ min: 50, max: 300 }),
        fourStars: faker.number.int({ min: 20, max: 200 }),
        threeStars: faker.number.int({ min: 10, max: 100 }),
        twoStars: faker.number.int({ min: 0, max: 50 }),
        oneStar: faker.number.int({ min: 0, max: 30 }),
      },
    });
  }

  /* =======================
     CART
  ======================= */
  console.log('🌱 Seeding cart');

  await prisma.cartItem.createMany({
    data: products.slice(0, 3).map((p) => ({
      userId: user.id,
      productId: p.id,
      quantity: faker.number.int({ min: 1, max: 3 }).toString(),
    })),
  });

  /* =======================
     ORDERS + TIMELINE + PAYMENT
  ======================= */
  console.log('🌱 Seeding orders and payment flow');

  for (let i = 0; i < 3; i++) {
    const order = await prisma.order.create({
      data: {
        orderNumber: faker.string.uuid(),
        user: { connect: { id: user.id } },
        customerName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone ?? DEFAULT_PHONE,
        paymentMethod: faker.helpers.arrayElement(['COD', 'VNPAY', 'MOMO']),
        paymentStatus: 'paid',
        status: 'pending',
        subtotal: 2_000_000,
        shipping: 30_000,
        tax: 50_000,
        totalPrice: 2_080_000,
        address: '123 Nguyen Trai Street',
        city: 'Ho Chi Minh City',
        state: 'HCM',
        zip: '700000',
      },
    });

    /* Order items */
    await prisma.orderProduct.createMany({
      data: products.slice(0, 3).map((p) => ({
        orderId: order.id,
        productId: p.id,
        quantity: faker.number.int({ min: 1, max: 3 }),
      })),
    });

    /* Order timeline */
    const timeline = [
      'Order placed',
      'Order confirmed',
      'Order packed',
      'Order shipped',
      'Order delivered',
    ];

    for (const step of timeline) {
      await prisma.notification.create({
        data: {
          userId: user.id,
          title: 'Order Status Update',
          message: `${step} for order ${order.orderNumber}`,
          type: 'order',
          priority: 'medium',
          sentAt: faker.date.recent(),
        },
      });
    }

    /* Payment history */
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: 'Payment Successful',
        message: `Payment completed for order ${order.orderNumber}`,
        type: 'system',
        priority: 'high',
      },
    });

    /* Wallet transaction */
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: 'Wallet Transaction',
        message: `-2,080,000 VND deducted for order ${order.orderNumber}`,
        type: 'system',
        priority: 'low',
      },
    });
  }

  /* =======================
     WALLET BALANCE FINAL
  ======================= */
  await prisma.user.update({
    where: { id: user.id },
    data: {
      walletBalance: 5_000_000,
    },
  });

  console.log('✅ FULL BUSINESS SEED COMPLETED SUCCESSFULLY');
}

/* ======================================================
   RUN
====================================================== */
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
