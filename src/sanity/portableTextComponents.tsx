import Image from "next/image";
import { createDataAttribute, PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { createDataAttributeConfig } from "@/components/DNDPortableText";

export function components({
  documentId,
  documentType,
}: {
  documentId: string;
  documentType: string;
}): PortableTextComponents {
  const attr = (key?: string) =>
    createDataAttribute({
      ...createDataAttributeConfig,
      id: documentId,
      type: documentType,
      path: `body[_key=="${key}"]`,
    }).toString();

  return {
    block: {
      h1: ({ children, value }) => (
        <h1 key={value._key} data-sanity={attr(value._key)}>
          {children}
        </h1>
      ),
      h2: ({ children, value }) => (
        <h2 key={value._key} data-sanity={attr(value._key)}>
          {children}
        </h2>
      ),
      h3: ({ children, value }) => (
        <h3 key={value._key} data-sanity={attr(value._key)}>
          {children}
        </h3>
      ),
      normal: ({ children, value }) => (
        <div className="relative">
          <div
            className="absolute -inset-2"
            key={value._key}
            data-sanity={attr(value._key)}
          ></div>
          <p>{children}</p>
        </div>
      ),
    },
    // (props) => (
    //   <div
    //     className="p-12"
    //     key={props.value._key}
    //     data-sanity={createDataAttribute({
    //       ...createDataAttributeConfig,
    //       id: documentId,
    //       type: documentType,
    //       path: `body[_key=="${props.value._key}"]`,
    //     }).toString()}
    //   >
    //     {props.children}
    //   </div>
    // ),
    types: {
      image: (props) =>
        props.value.asset ? (
          <p>
            <Image
              key={props.value._key}
              data-sanity={createDataAttribute({
                ...createDataAttributeConfig,
                id: documentId,
                type: documentType,
                path: `body[_key=="${props.value._key}"]`,
              }).toString()}
              className="rounded-lg not-prose w-full h-auto"
              src={urlFor(props.value)
                .width(600)
                .height(400)
                .quality(80)
                .auto("format")
                .url()}
              alt={props?.value?.alt || ""}
              width="600"
              height="400"
            />
          </p>
        ) : null,
    },
  };
}
