import { Router } from "express";
import multer from "multer";
import {
    add_group,
    add_member,
    add_transaction,
    get_groups,
    get_members,
    get_transaction_by_id,
    get_transactions,
    remove_member,
    update_member_pending_status_by_id,
    sendEmails,
    getReceipt,
    downloadReceipt,
} from "./groups.controller.js";
import { checkToken } from "../users/users.middleware.js";

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads/");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    },
});

const router = Router();

router.post("/", add_group);
router.get("/", get_groups); // (both user in, and pending groups with ?pending=true)

router.post("/:group_id/members", add_member);
router.delete("/:group_id/members/:member_id", remove_member);
router.get("/:group_id/members/", get_members);
router.get("/:group_id/members/:member_id", update_member_pending_status_by_id);

router.post(
    "/:group_id/transactions",
    multer({ dest: "uploads/" }).single("receipt"),
   //multer({dest: storage}).single('receipt'),
    checkToken,
    add_transaction
);
router.get("/:group_id/transactions", get_transactions);
router.get("/:group_id/transactions/:transaction_id", get_transaction_by_id);
router.post("/send_emails", sendEmails);
router.get("/receipt/:file_name",  getReceipt);
router.get("/download", downloadReceipt)
export default router;


