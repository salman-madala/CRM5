import Content from "@altair/system/Content";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getSession } from "../../../session";

const UserDetailsView = (props) => {
  const [name, setName] = useState("");

  const userName = async () => {
    const session = await getSession();
    let resu = await Content.getByRef({
      session: session,
      contentRef: { contentType: "altair.system.User", id: props.userId },
    });
    setName(resu.__data.content.__data.fullName);
  };

  useEffect(() => {
    userName();
  }, []);

  return <div>{name}</div>;
};

export default UserDetailsView;
