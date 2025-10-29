// app/api/users/route.js
    import { NextResponse } from 'next/server';
    import demo from './demo.json';

    export async function GET() {
        // Fetch users from a database or external API
        const documents = demo;
        return NextResponse.json(documents);
    }