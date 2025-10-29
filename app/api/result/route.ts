import { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';
import * as path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Define a type for the expected data structure (optional, but good practice)
interface SavedData {
  [key: string]: boolean
}

export const POST = async (req: NextRequest) => {

  try {
    const incomingData = await req.json();
    
    const dataToSave = {
      ...incomingData,
    };

    const filePath = path.join(process.cwd(), 'app', 'api', 'result', 'data.json');
    
    const jsonString = JSON.stringify(dataToSave, null, 2); 

    fs.writeFileSync(filePath, jsonString);

    return NextResponse.json({ 
      message: 'Data successfully saved to data.json',
      data: dataToSave
    }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error during file operation' },
      { status: 500 }
    );
  }
}