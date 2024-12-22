import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/lib/utils/hooks/useLocalStorage";
import { GitGraphIcon, PlusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDataMutation } from "@/lib/utils/react-query";

export const Route = createFileRoute("/")({
  component: Index,
});

const USERNAME_MAX_LENGTH = 20;
const USERNAME_MIN_LENGTH = 3;

function Index() {
  const [search, setSearch] = useState("");
  const [usernames, setUsernames] = useState<string[]>([]);
  const [prevSearched, setPrevSearched] = useState<string[]>([]);

  const storage = useLocalStorage();

  const data = useDataMutation();

  useEffect(() => {
    /**
     * Get prevSearched from localStorage
     */
    const prev = storage.get({ key: "prevSearched" });

    if (prev) {
      setPrevSearched(JSON.parse(prev));
    }
  }, []);

  return (
    <main className="flex flex-col justify-start items-start gap-8 p-12 min-h-screen w-screen">
      <div className="flex flex-col gap-4">
        {/**
         *
         * Header
         *
         */}
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-black">Data Visualization</h1>
          <p className="text-lg text-muted-foreground">
            Fun project to visualize data.
          </p>
        </div>

        {/**
         *
         * Buttons to
         * - Visualize data
         * - Add a new username
         *
         */}
        <div className="flex flex-wrap gap-2 justify-start items-center">
          <Button>
            <GitGraphIcon className="size-4" /> <span>Visualize Data</span>
          </Button>

          {/**
           *
           * Dialog to add a new username to the list of selected usernames.
           *
           */}
          <Dialog>
            <DialogTrigger>
              <Button>
                <PlusIcon className="size-4" /> <span>Add Username</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add User</DialogTitle>
                <DialogDescription className="space-y-6">
                  <p>Add a user by entering their username.</p>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Enter a username"
                        className="w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <p className="text-sm text-destructive">
                        Username must be between {USERNAME_MIN_LENGTH} and{" "}
                        {USERNAME_MAX_LENGTH} characters.
                      </p>
                    </div>

                    <Button
                      onClick={() => {
                        if (
                          search.length < USERNAME_MIN_LENGTH ||
                          search.length > USERNAME_MAX_LENGTH
                        ) {
                          return;
                        }

                        if (usernames.includes(search)) {
                          return;
                        }

                        setUsernames((prev) => [...prev, search]);
                        setPrevSearched((prev) => {
                          const _new = [...prev, search];

                          storage.set({ key: "prevSearched", value: _new });

                          return _new;
                        });
                      }}
                    >
                      <PlusIcon className="size-4" />
                      <span>Add to selected</span>
                    </Button>
                  </div>

                  <ScrollArea className="h-80">
                    <Table>
                      <TableCaption>Recent searches</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Username</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {prevSearched.map((username) => (
                          <TableRow key={username}>
                            <TableCell>{username}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/**
       *
       * Results
       *
       * - Show all selected usernames
       * - Graph to show the data visualization
       *
       */}
      <div className="flex flex-col gap-10 justify-start items-start w-full">
        <div className="flex flex-col items-start justify-start gap-6 max-w-xl w-full">
          <div className="flex flex-col gap-0">
            <h3 className="text-xl font-bold">Selected Usernames</h3>
            <p className="text-muted-foreground">
              List of all selected usernames.
            </p>
          </div>

          <div className="flex flex-wrap justify-start items-start gap-2">
            {usernames.length > 0 ? (
              usernames.map((username) => (
                <Badge key={username} variant="outline">
                  {username}
                </Badge>
              ))
            ) : (
              <p>No usernames selected</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start justify-start gap-6 max-w-xl w-full">
          <div className="flex flex-col gap-0">
            <h3 className="text-xl font-bold">Results</h3>
            <p className="text-muted-foreground">List of all data results.</p>
          </div>

          <div className="flex flex-wrap justify-start items-start gap-2">
            {data.data ? (
              data.data.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))
            ) : (
              <p>No data</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
