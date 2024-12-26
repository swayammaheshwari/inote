import { NextResponse } from 'next/server';

// Mock database
const dataStore = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

// GET handler: Fetch data
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const user = dataStore.find((item) => item.id === parseInt(id));
    if (user) {
      return NextResponse.json({ success: true, user });
    }
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, users: dataStore });
}

// POST handler: Create data
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 });
    }

    const newUser = {
      id: dataStore.length + 1,
      name,
      email,
    };
    dataStore.push(newUser);

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid JSON payload' }, { status: 400 });
  }
}

// PUT handler: Update data
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, email } = body;

    if (!id || !name || !email) {
      return NextResponse.json({ success: false, error: 'ID, name, and email are required' }, { status: 400 });
    }

    const userIndex = dataStore.findIndex((item) => item.id === parseInt(id));
    if (userIndex === -1) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    dataStore[userIndex] = { id: parseInt(id), name, email };

    return NextResponse.json({ success: true, user: dataStore[userIndex] });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid JSON payload' }, { status: 400 });
  }
}

// DELETE handler: Delete data
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
  }

  const userIndex = dataStore.findIndex((item) => item.id === parseInt(id));
  if (userIndex === -1) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
  }

  const deletedUser = dataStore.splice(userIndex, 1);

  return NextResponse.json({ success: true, user: deletedUser[0] });
}
