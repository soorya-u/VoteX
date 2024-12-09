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
  SelectLabel,
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
      selected === "All" ? users : users.filter((v) => v.status === selected)
    );
  }, [selected]);

  return (
    <>
      <div className="flex w-full justify-center gap-4 xs-sm:justify-between items-center px-12 mb-8 flex-col xs-sm:flex-row">
        <h1 className="text-4xl font-bold text-primary text-center">
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
                  )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {currentUsers.length > 0 ? (
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          {currentUsers.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </div>
      ) : (
        <div className="w-full mt-20">
          <h2 className="text-secondary text-center text-3xl">
            No {userType} Found
          </h2>
        </div>
      )}
    </>
  );
}

const UserCard = ({ user }: { user: User }) => (
  <Card className="w-full max-w-sm bg-[#3c3b3b7b] border-[#fff6e9] overflow-hidden flex flex-col relative">
    <div className="absolute top-2 right-2 z-10">
      <Badge
        variant="default"
        className={`text-xs px-2 py-1 ${
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
      <div className="relative w-full pt-[100%] rounded-lg overflow-hidden">
        <Image
          src={user.image}
          alt={`${user.name}'s profile`}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
    <CardContent className="px-6 pb-4 flex-grow flex flex-col justify-center items-center text-center">
      <h3 className="text-xl font-semibold text-primary mb-2">{user.name}</h3>
      <p className="text-secondary mb-1">Gender: {user.gender}</p>
      <p className="text-secondary mb-2">
        Date of Birth: {moment(user.dateOfBirth).format("MMM DD, YYYY")}
      </p>
      <Link
        href={`/candidates/${user.address}`}
        className="w-full rounded-md py-2 bg-[#F73859] hover:bg-[#e62d4e] text-white transition-colors duration-200"
      >
        View Profile
      </Link>
    </CardContent>
  </Card>
);
