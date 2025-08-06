"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TStatus = "Pending" | "Approved" | "Rejected";

type User = {
  name: string;
  dateOfBirth: Date;
  gender: "Male" | "Female" | "Transgender";
  image: string;
  status: TStatus | "NotVer";
  address: string;
};

type CardsProps = {
  users: User[];
  userType: "Candidates" | "Voters";
};

export default function UserCards({ users, userType }: CardsProps) {
  const [selected, setSelected] = useState<TStatus | "All">("All");
  const [currentUsers, setCurrentUsers] = useState<User[]>(users);

  useEffect(() => {
    setCurrentUsers(
      selected === "All" ? users : users.filter((v) => v.status === selected),
    );
  }, [selected, users]);

  return (
    <>
      <div className="mb-8 flex w-full flex-col items-center justify-center gap-4 px-12 xs-sm:flex-row xs-sm:justify-between">
        <h1 className="text-center text-4xl font-bold text-primary">
          {selected} {userType} List
        </h1>
        <Select
          value={selected}
          onValueChange={(v) => setSelected(v as TStatus | "All")}
        >
          <SelectTrigger className="w-[190px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent className="bg-[#00000038] backdrop-blur-sm">
            <SelectGroup>
              {[
                "All",
                "Pending",
                "Approved",
                userType === "Candidates" ? "Rejected" : "",
              ].map(
                (v) =>
                  v && (
                    <SelectItem key={v} value={v}>
                      {v} {userType}
                    </SelectItem>
                  ),
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {currentUsers.length > 0 ? (
        <div className="grid grid-cols-1 place-items-center gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {currentUsers.map((user, index) => (
            <UserCard userType={userType} key={index} user={user} />
          ))}
        </div>
      ) : (
        <div className="mt-20 w-full">
          <h2 className="text-center text-3xl text-secondary">
            No {userType} Found
          </h2>
        </div>
      )}
    </>
  );
}

const UserCard = ({
  user,
  userType,
}: {
  user: User;
  userType: "Candidates" | "Voters";
}) => (
  <Card className="relative flex w-full max-w-sm flex-col overflow-hidden border-secondary bg-[#3c3b3b7b]">
    <div className="absolute right-2 top-2 z-10">
      <Badge
        variant="default"
        className={`px-2 py-1 text-xs ${
          user.status === "Approved"
            ? "bg-green-500"
            : user.status === "Pending"
              ? "bg-yellow-600"
              : user.status === "Rejected"
                ? "bg-red-500"
                : "bg-gray-400"
        }`}
      >
        {user.status}
      </Badge>
    </div>
    <div className="p-6">
      <div className="relative w-full overflow-hidden rounded-lg pt-[100%]">
        <Image
          src={user.image}
          alt={`${user.name}'s profile`}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
    <CardContent className="flex flex-grow flex-col items-center justify-center px-6 pb-4 text-center">
      <h3 className="mb-2 text-xl font-semibold text-primary">{user.name}</h3>
      <p className="mb-1 text-secondary">Gender: {user.gender}</p>
      <p className="mb-2 text-secondary">
        Date of Birth: {moment(user.dateOfBirth).format("MMM DD, YYYY")}
      </p>
      <Link
        href={`/${userType.toLowerCase()}/${user.address}`}
        className="w-full rounded-md bg-primary py-2 text-white transition-colors duration-200 hover:bg-[#129992]"
      >
        View Profile
      </Link>
    </CardContent>
  </Card>
);
