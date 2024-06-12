import { DeveloperModalController } from "@/package/components/modal";
import { AddDeveloper } from "./addDeveloper/addDeveloper";
import { DeveloperList } from "./developerList";
import { DeveloperModal, DeveloperModalProvider } from "./developerModal";

import styles from "./developerPage.module.scss";
import { LevelModalProvider } from "../niveis/levelModal";

export default function Developers() {
  return (
    <DeveloperModalProvider>
      <LevelModalProvider>
        <div className={styles.developerPageContainer}>
          <section className={styles.addDeveloper}>
            <AddDeveloper />
          </section>
          <section className={styles.developerList}>
            <DeveloperList />
          </section>

          <section>
            <DeveloperModalController>
              <DeveloperModal />
            </DeveloperModalController>
          </section>
        </div>
      </LevelModalProvider>
    </DeveloperModalProvider>
  );
}
