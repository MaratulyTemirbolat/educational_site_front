import { Metadata } from "next";

import ClassSubjectDetail from "@/components/ClassSubject/ClassSubjectDetail/ClassSubjectDetail";


type ClassSubjectPageProps = {
  params: {
        id: number;
  };
  searchParams: {
    page?: number;
  };
};

export async function generateMetadata(
  {
    params: {
      id 
    },
    searchParams: {
      page
    }
  }: ClassSubjectPageProps
): Promise<Metadata> {
    return {
        title: "Тест"
    };
};

export default async function ClassSubjectsPage(
  {
    params: {
        id
    },
    searchParams: {
      page=1
    }
  }: ClassSubjectPageProps
) {
  console.log(id, page);
  return (
    <section style={{marginTop: "10px"}}>
        <ClassSubjectDetail id={id} page={page}/>
    </section>
  );
};