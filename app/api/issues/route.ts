import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { createIssueSchema } from "../../validationSchema";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const validation = createIssueSchema.safeParse(body)
    if(!validation.success){
        return NextResponse.json(validation.error.format() ,{status:400})
    }
    
    
    const newIssue = await prisma.issue.create({
        data:{
            title:body.title,
            description:body.description
        }
    })
    return NextResponse.json(newIssue,{status:201})
}

export async function GET(req: NextRequest) {
    const [openCount, inProgressCount, closedCount] = await Promise.all([
        prisma.issue.count({ where: { status: 'OPEN' } }),
        prisma.issue.count({ where: { status: 'IN_PROGRESS' } }),
        prisma.issue.count({ where: { status: 'CLOSED' } }),
    ]);

    const counts = {
        OPEN: openCount,
        IN_PROGRESS: inProgressCount,
        CLOSED: closedCount,
    };

    const issues = await prisma.issue.findMany({})
    

    return NextResponse.json({ counts: counts, issues:issues });


}

