import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div style={{ textAlign: "center" }}>
          <h1>在獲取您的個人資料之前，您必須先登錄。</h1>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => {
              navigate("/Login");
            }}
          >
            回到登入頁面
          </button>
        </div>
      )}
      {currentUser && (
        <div>
          <h2>以下是您的個人檔案：</h2>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>姓名：{currentUser[0].Username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您的用戶ID: {currentUser[0].id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您註冊的電子信箱: {currentUser[0].Email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>身份: {currentUser[0].Role}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
