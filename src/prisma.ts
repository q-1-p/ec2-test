import { PrismaClient } from '@prisma/client';

// Prismaクライアントのインスタンスを作成
export const prisma = new PrismaClient();

// すべてのRecordを取得する関数
export async function getAllRecords() {
  try {
    const records = await prisma.record.findMany();
    return records;
  } catch (error) {
    console.error('レコードの取得中にエラーが発生しました:', error);
    throw error;
  }
}

// IDによってRecordを取得する関数
export async function getRecordById(id: string) {
  try {
    const record = await prisma.record.findUnique({
      where: { id },
    });
    return record;
  } catch (error) {
    console.error(`ID: ${id} のレコード取得中にエラーが発生しました:`, error);
    throw error;
  }
}

// タイトルによってRecordを取得する関数
export async function getRecordByTitle(title: string) {
  try {
    const record = await prisma.record.findUnique({
      where: { title },
    });
    return record;
  } catch (error) {
    console.error(`タイトル: ${title} のレコード取得中にエラーが発生しました:`, error);
    throw error;
  }
}

// Recordを作成する関数
export async function createRecord(data: { title: string; time?: string }) {
  try {
    const record = await prisma.record.create({
      data,
    });
    return record;
  } catch (error) {
    console.error('レコードの作成中にエラーが発生しました:', error);
    throw error;
  }
}

// Recordを更新する関数
export async function updateRecord(id: string, data: { title?: string; time?: string }) {
  try {
    const record = await prisma.record.update({
      where: { id },
      data,
    });
    return record;
  } catch (error) {
    console.error(`ID: ${id} のレコード更新中にエラーが発生しました:`, error);
    throw error;
  }
}

// Recordを削除する関数
export async function deleteRecord(id: string) {
  try {
    const record = await prisma.record.delete({
      where: { id },
    });
    return record;
  } catch (error) {
    console.error(`ID: ${id} のレコード削除中にエラーが発生しました:`, error);
    throw error;
  }
}