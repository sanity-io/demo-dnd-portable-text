"use client";

import { createDataAttribute, PortableText } from "next-sanity";
import { useOptimistic } from "@sanity/visual-editing";
import { client } from "@/sanity/lib/client";
import { TypedObject } from "sanity";
import { components } from "@/sanity/portableTextComponents";
import { POST_QUERYResult } from "@/sanity/types";

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === "string" ? stega.studioUrl : "",
};

type DNDPortableTextProps = {
  value: TypedObject[];
  documentId: string;
  documentType: string;
};

export function DNDPortableText({
  value,
  documentId,
  documentType,
}: DNDPortableTextProps) {
  const sections = useOptimistic<
    TypedObject[] | undefined,
    NonNullable<POST_QUERYResult>["body"]
  >(value, (currentSections, action) => {
    if (action.id === documentId && action?.document?.body) {
      return action.document.body;
    }
    return currentSections;
  });

  console.log({
    ...createDataAttributeConfig,
    id: documentId,
    type: documentType,
    path: "body",
  });

  return (
    <div
      className="prose"
      data-sanity={createDataAttribute({
        ...createDataAttributeConfig,
        id: documentId,
        type: documentType,
        path: "body",
      }).toString()}
    >
      <PortableText
        value={sections}
        components={components({
          documentId,
          documentType,
        })}
      />
    </div>
  );
}
