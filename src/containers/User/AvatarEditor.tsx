import auth from "api/base/auth";
import { avatarUrl } from "api/base/url";
import { updateUser, uploadAvatar } from "api/User";
import LoadingButton from "components/LoadingButton";
import { message } from "components/MessageBox";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import useLoading from "hooks/useLoading";
import UserModel from "models/User";
import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiDownload, FiUpload } from "react-icons/fi";
import { useStore } from "rlax";
import avatar from "utils/avatar";
import joinUrl from "utils/join-url";
import style from "./avatar-editor.module.css";

type Props = {
  show: boolean;
  onHide: () => void;
  onAvatarUpdate: (updatedUser: UserModel.PrivateInfo) => void;
};

const AVATAR_WIDTH = 300;
const AVATAR_HEIGHT = 300;

function getFixedSizeImage(canvas: HTMLCanvasElement): Promise<Blob | null> {
  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = AVATAR_WIDTH;
  tmpCanvas.height = AVATAR_HEIGHT;

  const ctx = tmpCanvas.getContext("2d");
  ctx?.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, AVATAR_WIDTH, AVATAR_HEIGHT);

  return new Promise((resolve) => {
    tmpCanvas.toBlob(resolve, "image/jpeg", 1);
  });
}

export default function AvatarEditor(props: Props) {
  const editorCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);
  const [selected, setSelected] = useState(false);

  function clear() {
    setSelected(false);
  }

  const cropperRef = useRef<Cropper>();

  useEffect(() => {
    if (selected) {
      cropperRef.current = new Cropper(editorCanvasRef.current as HTMLCanvasElement, {
        aspectRatio: 1,
        dragMode: "move",
        center: false,
        autoCropArea: 1,
        viewMode: 3,
        cropBoxMovable: false,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
        preview: previewRef.current as HTMLDivElement,
      });
    }
  }, [selected]);

  function updateCropper(imageFile: File) {
    const url = window.URL.createObjectURL(imageFile);
    cropperRef.current?.replace(url);
  }

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleSelectFileClick() {
    fileInputRef.current?.click();
  }

  function handleSelectFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const imageFile = e.target.files?.[0];
    if (!imageFile) {
      return;
    }
    if (!selected) {
      setSelected(true);
    }
    setTimeout(() => {
      updateCropper(imageFile);
    }, 0);
  }

  const [uploadAvatarLoading, uploadAvatarLoadingOps] = useLoading();

  async function handleUploadClick() {
    const cropper = cropperRef.current;
    if (!cropper) {
      return;
    }
    const imageBlob = await getFixedSizeImage(cropper.getCroppedCanvas());
    if (!imageBlob) {
      return;
    }
    const updatedUser = await uploadAvatarLoadingOps(handleUploadAvatar, imageBlob);
    if (updatedUser) {
      message({
        title: "Upload Succeed!",
        type: "success",
      });
      props.onHide();
      props.onAvatarUpdate(updatedUser);
    } else {
      message({
        title: "Upload Failed!",
        type: "error",
      });
    }
  }

  const currentUser: UserModel.PrivateInfo = useStore("user");

  async function handleUploadAvatar(imageBlob: Blob) {
    const res = await uploadAvatar(imageBlob);
    if (!res.success) {
      return null;
    }
    const url = joinUrl(avatarUrl, res.message);
    const updatedUser = await auth(null, updateUser, {
      username: currentUser.name,
      avatar: url,
    });
    if (updatedUser && updatedUser.avatar === url) {
      return updatedUser;
    }
    return null;
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      onExited={clear}
      centered
      dialogClassName={style.avatar_editor}>
      <div className={style.avatar_editor}>
        <div className={style.editor}>
          <canvas ref={editorCanvasRef}></canvas>
          {selected ? null : (
            <div className={style.editor_placeholder}>
              <FiDownload />
              <span>Please select image</span>
            </div>
          )}
        </div>
        <div className={style.select_and_preview}>
          <div className={style.item}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
              style={{ display: "none" }}
              onChange={handleSelectFileChange}
            />
            <button className={style.upload_image_btn} onClick={handleSelectFileClick}>
              <FiUpload size="40%" />
            </button>
            <span>Select</span>
          </div>
          <div className={style.item}>
            <div ref={previewRef} className={style.preview_container}>
              <img alt="" src={avatar()} />
            </div>
            <span>Preview</span>
          </div>
        </div>
        <div className={style.control}>
          <Button size="sm" variant="light" onClick={props.onHide}>
            CANCEL
          </Button>
          <LoadingButton
            loading={uploadAvatarLoading}
            size="sm"
            variant="primary"
            text="UPLOAD"
            loadingText="UPLOADING..."
            onClick={handleUploadClick}
          />
        </div>
      </div>
    </Modal>
  );
}
