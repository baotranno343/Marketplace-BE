import { faker } from '@faker-js/faker';
import { PrismaClient } from '../generated/prisma';

import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Start seeding...');

  /* =======================
     USER
  ======================= */
  const users = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.user.create({
        data: {
          email: faker.internet.email().toLowerCase(),
          password: faker.internet.password(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phone: faker.phone.number(),
          dateOfBirth: faker.date.birthdate({ min: 18, max: 50, mode: 'age' }),
          profileImage: faker.image.avatar(),
          walletBalance: faker.number.int({ min: 0, max: 5_000_000 }),
          isAdmin: faker.datatype.boolean(),
          isEmployee: faker.datatype.boolean(),
          employeeRole: faker.helpers.arrayElement([
            'CALL_CENTER',
            'PACKER',
            'WARE_HOUSE',
            'DELIVERY_MAN',
            'INCHARGE',
            'ACCOUNTS',
          ]),
        },
      }),
    ),
  );

  /* =======================
     CATEGORY
  ======================= */
  const categories = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.category.create({
        data: {
          title: faker.commerce.department(),
          slug: faker.helpers.slugify(faker.commerce.department()).toLowerCase(),
          description: faker.commerce.productDescription(),
          range: faker.number.int({ min: 1, max: 100 }),
          featured: faker.datatype.boolean(),
          imageUrl: faker.image.urlLoremFlickr({ category: 'product' }),
        },
      }),
    ),
  );

  /* =======================
     PRODUCT
  ======================= */
  const products = await Promise.all(
    Array.from({ length: 20 }).map(async () => {
      const product = await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          slug: faker.helpers.slugify(faker.commerce.productName()).toLowerCase(),
          description: faker.commerce.productDescription(),
          price: Number(faker.commerce.price({ min: 100_000, max: 5_000_000 })),
          discount: faker.number.int({ min: 0, max: 50 }),
          stock: faker.number.int({ min: 0, max: 100 }),
          status: faker.helpers.arrayElement(['NEW', 'HOT', 'SALE']),
          isFeatured: faker.datatype.boolean(),
          averageRating: faker.number.int({ min: 1, max: 5 }),
          totalReviews: faker.number.int({ min: 0, max: 500 }),
          categoryId: faker.helpers.arrayElement(categories).id,
          userId: faker.helpers.arrayElement(users).id,
        },
      });

      // Product Images
      await prisma.productImage.createMany({
        data: Array.from({ length: 3 }).map(() => ({
          productId: product.id,
          url: faker.image.urlLoremFlickr({ category: 'product' }),
          alt: product.name,
        })),
      });

      // Rating Distribution
      await prisma.ratingDistribution.create({
        data: {
          productId: product.id,
          fiveStars: faker.number.int({ min: 0, max: 100 }),
          fourStars: faker.number.int({ min: 0, max: 100 }),
          threeStars: faker.number.int({ min: 0, max: 100 }),
          twoStars: faker.number.int({ min: 0, max: 50 }),
          oneStar: faker.number.int({ min: 0, max: 30 }),
        },
      });

      return product;
    }),
  );

  /* =======================
     ADDRESS
  ======================= */
  await Promise.all(
    users.map((user) =>
      prisma.address.create({
        data: {
          userId: user.id,
          address: faker.location.streetAddress(),
        },
      }),
    ),
  );

  /* =======================
     CART ITEM
  ======================= */
  await Promise.all(
    users.map((user) =>
      prisma.cartItem.create({
        data: {
          userId: user.id,
          productId: faker.helpers.arrayElement(products).id,
          quantity: faker.number.int({ min: 1, max: 5 }).toString(),
        },
      }),
    ),
  );

  /* =======================
     ORDER + ORDER PRODUCT
  ======================= */
  for (const user of users) {
    const order = await prisma.order.create({
      data: {
        orderNumber: faker.string.uuid(),
        userId: user.id,
        customerName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone ?? faker.phone.number(),
        paymentMethod: faker.helpers.arrayElement(['COD', 'VNPAY', 'MOMO']),
        paymentStatus: faker.helpers.arrayElement(['paid', 'pending']),
        status: faker.helpers.arrayElement(['pending', 'completed', 'cancelled']),
        subtotal: 1_000_000,
        shipping: 30_000,
        tax: 50_000,
        totalPrice: 1_080_000,
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zip: faker.location.zipCode(),
      },
    });

    await prisma.orderProduct.createMany({
      data: Array.from({ length: 2 }).map(() => ({
        orderId: order.id,
        productId: faker.helpers.arrayElement(products).id,
        quantity: faker.number.int({ min: 1, max: 3 }),
      })),
    });
  }

  /* =======================
     NOTIFICATION
  ======================= */
  await Promise.all(
    users.map((user) =>
      prisma.notification.create({
        data: {
          userId: user.id,
          title: faker.lorem.words(3),
          message: faker.lorem.sentences(2),
          type: faker.helpers.arrayElement(['promo', 'order', 'system', 'marketing', 'general']),
          priority: faker.helpers.arrayElement(['low', 'medium', 'high', 'urgent']),
          sentAt: faker.date.recent(),
        },
      }),
    ),
  );

  console.log('✅ Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
