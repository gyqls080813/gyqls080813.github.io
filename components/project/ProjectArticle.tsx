import type { Project } from "@/lib/projects";
import { nodeHref } from "@/lib/nodeTarget";
import {
  Chip,
  FactRow,
  Figure,
  Kicker,
  NodeCard,
  SectionHeading,
  TextBlock,
} from "../content";
import { slugify } from "@/lib/slug";
/* 제목은 목차를 만드는 쪽과 같은 것을 봐야 한다 — 각자 적으면 언젠가 어긋난다 */
import { PROJECT_HEADINGS, troublesOf } from "@/lib/sheet";
/* 시트 안쪽 폭은 글 페이지와 같은 것을 쓴다 */
import sheetStyles from "../content/Sheet.module.css";
import styles from "./ProjectArticle.module.css";

const { intro: INTRO, views: VIEWS, troubles: TROUBLES } = PROJECT_HEADINGS;

/** 프로젝트 시트 안쪽 — 노드가 열리는 중에도 같은 내용이 그대로 보여야 해서 따로 뒀다 */
export default function ProjectArticle({ project }: { project: Project }) {
  /* 그래프에서 이 프로젝트 노드에 매달린 트러블 노드들과 같은 목록 */
  const troubles = troublesOf(project.id);

  return (
    <div className={sheetStyles.articleInner}>
      <Kicker kind="project">프로젝트</Kicker>

      <h1 className={styles.title}>{project.name}</h1>
      <p className={styles.tagline}>{project.tagline}</p>

      <div className={styles.factsSection}>
        <FactRow label="기간">{project.period}</FactRow>
        <FactRow label="팀">{project.team}</FactRow>
        <FactRow label="역할">{project.role}</FactRow>
        {project.award && <FactRow label="성과">{project.award}</FactRow>}
      </div>

      <div className={styles.stack}>
        {project.stack.map((item) => (
          <Chip key={item} kind="project" variant="outline">
            {item}
          </Chip>
        ))}
      </div>

      <div className={styles.blocks} id={slugify(INTRO)}>
        <TextBlock label={INTRO} accent="project">
          {project.intro}
        </TextBlock>
      </div>

      {project.views && project.views.length > 0 && (
        <section id={slugify(VIEWS)}>
          <SectionHeading icon="project" spaced>
            {VIEWS}
          </SectionHeading>
          <div className={styles.views}>
            {project.views.map((view) => (
              <Figure
                key={view.src}
                src={view.src}
                alt={view.alt}
                caption={view.caption}
                maxWidth={900}
                variant="wide"
              />
            ))}
          </div>
        </section>
      )}

      <div className={styles.blocks}>
        {project.blocks.map((block) => (
          <div key={block.label} id={slugify(block.label)}>
            <TextBlock label={block.label} accent="project">
              {block.body}
            </TextBlock>
          </div>
        ))}
      </div>

      {troubles.length > 0 && (
        <section id={slugify(TROUBLES)}>
          <SectionHeading icon="trouble" spaced>
            {TROUBLES}
          </SectionHeading>
          <div className={styles.troubles}>
            {troubles.map((post) => (
              <NodeCard
                key={post.id}
                kind="trouble"
                title={post.title}
                meta={`${post.date}, ${post.readMinutes}분`}
                href={nodeHref(post.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
