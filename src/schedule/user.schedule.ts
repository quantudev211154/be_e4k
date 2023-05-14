import CronJob from "node-cron";
import { EUserRole, UserSchema } from "../models";
import { sys } from "../configs";

export function resetUserScroreAndClaimCount() {
  const scheduledTask = CronJob.schedule("0 0 * * MON", async () => {
    sys.log("- - - USER SCHEDULED TASK IS RUNNING - - -");

    const filter = {
      role: EUserRole.PLAYER,
      isDeleted: false,
    };
    const updaters = {
      lastClaimdDate: null,
      claimCount: 0,
      weeklyScore: 0,
    };
    await UserSchema.updateMany(filter, updaters);

    sys.log("- - - USER SCHEDULED TASK DONE - - -");
  });

  scheduledTask.start();
}
