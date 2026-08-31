import type { Metadata } from "next";
import IntroView from "@/components/IntroView";

export const metadata: Metadata = {
  title: "Who am I — 민엽의 트러블로그",
};

export default function AboutPage() {
  return <IntroView />;
}
