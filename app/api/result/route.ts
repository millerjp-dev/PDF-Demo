import * as fs from 'fs';
import * as path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {

  try {
    const incomingData = await req.json();

    const filePath = path.join(process.cwd(), 'app', 'api', 'result', 'data.json');
    
    const jsonString = JSON.stringify(incomingData, null, 2); 

    fs.writeFileSync(filePath, jsonString);

    return NextResponse.json({ 
      message: 'Data successfully saved to data.json',
      data: incomingData
    }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error during file operation' },
      { status: 500 }
    );
  }
}