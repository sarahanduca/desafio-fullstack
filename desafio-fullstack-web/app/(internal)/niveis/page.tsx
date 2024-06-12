import { LevelModalProvider } from "./levelModal";
import { LevelModal } from "./levelModal";
import { LevelList } from "./levelList";
import { AddLevel } from "./addLevel";

import styles from "./levelPage.module.scss";
import { LevelModalController } from "@/package/components/modal";

export default async function Levels() {
  return (
    <LevelModalProvider>
      <div className={styles.levelPageContainer}>
        <section className={styles.addLevelButton}>
          <AddLevel />
        </section>

        <section>
          <LevelList />
        </section>
      </div>

      <LevelModalController>
        <LevelModal />
      </LevelModalController>
    </LevelModalProvider>
  );
}
