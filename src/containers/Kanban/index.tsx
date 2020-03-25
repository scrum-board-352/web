import Loading from "components/Loading";
import Searchbar from "components/Searchbar";
import Select, { Option } from "components/Select";
import SettingButton from "components/SettingButton";
import ProjectModel from "models/Project";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import ScrollBox from "react-responsive-scrollbox";
import { useHistory, useParams } from "react-router-dom";
import testCardData from "utils/testCardData";
import testProjectData from "utils/testProjectData";
import CardCol from "./CardCol";
import CardDetail from "./CardDetail";
import { CardsManager } from "./CardsManager";
import style from "./style.module.css";

export default function Kanban() {
  const { projectId, stage } = useParams();
  const history = useHistory();
  const [project, setProject] = useState<ProjectModel.Info>({
    id: "",
    name: "",
    iteration: 0,
    createTime: "",
    creator: "",
    col: [],
    row: [],
  });

  const projectStageOptions: Option[] = useMemo<Option[]>(
    () =>
      project.row.map((stage) => ({
        name: stage,
        value: stage,
      })),
    [project]
  );

  const [loading, setLoadig] = useState(true);

  useEffect(() => {
    (async () => {
      // TODO: fetch project info.
      // await sleep(3000);
      const project = testProjectData.info.shitMountain;
      if (projectId !== project.id) {
        history.replace("/404");
        return;
      }
      if (!stage) {
        history.replace(`${projectId}/${project.row[0]}`);
        return;
      }
      if (!project.row.includes(stage)) {
        history.replace("/404");
        return;
      }
      setProject(project);
      setLoadig(false);
    })();
  }, [projectId, stage, history]);

  return (
    <div className={style.container}>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className={style.topbar}>
            <h1>{project.name}</h1>
            <Select
              options={projectStageOptions}
              defaultValue={stage ?? ""}
              onChange={(stage) => history.push(stage)}
            />
            <Searchbar
              className={style.topbar_search}
              placeholder="Search card"
              type="round"
              color="#ddd"
              size="1.5rem"
            />
            <SettingButton
              size="1.5rem"
              color="#ddd"
              hoverColor="var(--blue)"
            />
          </div>
          <ScrollBox className="scrollbar_thumb_green">
            <div className={style.card_col_container}>
              <CardsManager cards={testCardData.info.cards}>
                {project.col.map((col) => (
                  <CardCol key={col} colName={col} />
                ))}
              </CardsManager>
            </div>
          </ScrollBox>
          <CardDetail show={true} card={testCardData.info.card1} />
        </Fragment>
      )}
    </div>
  );
}
