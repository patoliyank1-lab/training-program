import {
    Link,
    BookOpen,
    BookMarked,
    FolderKanban,
    Box,
    Star,
    Users,
    Building,
    MapPin,
    IdCardLanyard,
    GitFork,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataFromAPI, getUserDetails } from "../API/getUserDetails";

export default function UserPage() {
        const { username } = useParams();
        const [userData, setUserData] = useState<unknown>({
  login: "facebook",
  id: 69631,
  node_id: "MDEyOk9yZ2FuaXphdGlvbjY5NjMx",
  avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/facebook",
  html_url: "https://github.com/facebook",
  followers_url: "https://api.github.com/users/facebook/followers",
  following_url: "https://api.github.com/users/facebook/following{/other_user}",
  gists_url: "https://api.github.com/users/facebook/gists{/gist_id}",
  starred_url: "https://api.github.com/users/facebook/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/facebook/subscriptions",
  organizations_url: "https://api.github.com/users/facebook/orgs",
  repos_url: "https://api.github.com/users/facebook/repos",
  events_url: "https://api.github.com/users/facebook/events{/privacy}",
  received_events_url: "https://api.github.com/users/facebook/received_events",
  type: "Organization",
  user_view_type: "public",
  site_admin: false,
  name: "Meta",
  company: null,
  blog: "https://opensource.fb.com",
  location: "Menlo Park, California",
  email: null,
  hireable: null,
  bio: "We are working to build community through open source technology. NB: members must have two-factor auth.",
  twitter_username: "MetaOpenSource",
  public_repos: 161,
  public_gists: 12,
  followers: 34210,
  following: 0,
  created_at: "2009-04-02T03:35:22Z",
  updated_at: "2024-12-27T21:10:02Z"
});

const [repos, setRepos]= useState([]);

    const [overview, setOverview] = useState<boolean>(true);
    const [repositories, setRepositories] = useState<boolean>(false);
    const [project, setProject] = useState<boolean>(false);
    const [packages, setPackages] = useState<boolean>(false);
    const [stars, setStars] = useState<boolean>(false);

    useEffect(() => {
        if (username) {
            (async () => {
                const data = await getUserDetails(username);
                if (data.success) {
                    setUserData(data.data);
                }
            })();
        }
    }, [username]);

    useEffect(()=>{
        if(userData.repos_url){
                      (async () => {
                const data = await getDataFromAPI(userData.repos_url);
                if (data.success) {
                    setRepos(data.data);
                }
            })();
        }
    },[userData.repos_url])

        useEffect(() => {
        if (username) {
            (async () => {
                // const data = await getUserDetails(username);
                // if (data.success) {
                //     setUserData(data.data);
                // }
            })();
        }
    }, [username]);


    useEffect(() => {
        console.log(repos);
    },[repos]);

    

    const onRepoClick = useCallback(() => {
        setOverview(false)
        setRepositories(true)
        setProject(false)
        setPackages(false)
        setStars(false)
    }, [])

    const onOverClick = useCallback(() => {
        setOverview(true)
        setRepositories(false)
        setProject(false)
        setPackages(false)
        setStars(false)
    }, [])

    const onProjectClick = useCallback(() => {
        setOverview(false)
        setRepositories(false)
        setProject(true)
        setPackages(false)
        setStars(false)
    }, [])

    const onPackageClick = useCallback(() => {
        setOverview(false)
        setRepositories(false)
        setProject(false)
        setPackages(true)
        setStars(false)
    }, [])
    const onStarsClick = useCallback(() => {
        setOverview(false)
        setRepositories(false)
        setProject(false)
        setPackages(false)
        setStars(true)
    }, [])
    return (
        <div className="bg-gray-950 h-screen w-full flex justify-center overflow-auto">
            <div className="max-w-400 h-full p-5 w-full flex flex-col md:flex-row">
                <div className="flex flex-col md:w-80">
                    <div className="flex md:flex-col items-center ">
                        <div className="flex text-gray-400">
                            <div className="bg-gray-600 size-24 md:size-60 overflow-hidden rounded-full">
                                <img
                                    src={userData.avatar_url}
                                    alt=""
                                    className=" w-full h-full"
                                />
                            </div>
                        </div>
                        <div className=" text-gray-400 m-5 md:m-0 md:my-3">
                            <div className="flex justify-center  flex-col">
                                <h1 className=" text-2xl md:text-4xl text-gray-300">{userData.name}</h1>
                                <h2 className="md:text-2xl">{userData.login}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col  border-2 border-x-0 border-t-0 border-b-gray-500 md:border-b-0">
                        <div className="mb-3 md:pl-15 text-gray-300 flex flex-col gap-1.5">
                            {userData.bio && <p className="my-3">{userData.bio}</p>}
                            {userData.blog && <div className="flex text-sm items-center md:hidden">
                                <Link className="size-3.5 mr-1" />
                                <p>{userData.blog}</p>
                            </div>}
                            {userData.company && <div className="flex text-sm items-center md:hidden">
                                <IdCardLanyard className="size-3.5 mr-1" />
                                <p>{userData.company}</p>
                            </div>}

                            <div className="flex text-sm items-center">
                                <Users className="size-3.5 mr-1" />
                                <p>
                                    <span className="text-white font-bold">{userData.followers}</span> followers
                                </p>
                                <span className="font-extrabold mx-1">.</span>
                                <p>
                                    <span className="text-white font-bold">{userData.following}</span> following
                                </p>
                            </div>

                            <div className="md:flex flex-col gap-1.5 hidden ">
                              {userData.location &&  <div className="flex text-sm items-center ">
                                    <Building className="size-3.5 mr-1" />
                                    <p>{userData.location}</p>
                                </div>}
                                {userData.location &&<div className="flex text-sm items-center ">
                                    <MapPin className="size-3.5 mr-1" />
                                    <p>{userData.location}</p>
                                </div>}
                                {userData.blog && <div className="flex text-sm items-center ">
                                    <Link className="size-3.5 mr-1" />
                                    <p>{userData.blog}</p>
                                </div>}
                                {userData.company && <div className="flex text-sm items-center ">
                                    <IdCardLanyard className="size-3.5 mr-1" />
                                    <p>{userData.company}</p>
                                </div>}
                            </div>
                            <div className="text-gray-100 text-center bg-white/10 rounded-xl border border-gray-500 w-full md:my-5 py-2 text-sm">
                                Follow
                            </div>
                            <div className="text-sm ml-2 my-1 text-gray-400">
                                Block or Report
                            </div>

                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-auto">
                    <div className="flex gap-3 md:gap-0 xl:gap-3 pt-3 overflow-x-auto md:overflow-visible text-sm text-gray-200 px-3 border-2 border-b-gray-500 border-x-0 border-t-0">
                        <div
                            className={`flex my-2 mx-3 cursor-pointer ${overview && "text-white font-bold border-3 border-b-orange-400 border-x-0 border-t-0"}`}
                            onClick={onOverClick}
                        >
                            <BookOpen className="size-4.5 " />
                            <span className="ml-2">Overview</span>
                        </div>
                        <div className={`flex my-2 mx-3 cursor-pointer ${repositories && "text-white font-bold border-3 border-b-orange-400 border-x-0 border-t-0"}`}
                            onClick={onRepoClick}>
                            <BookMarked className="size-4.5 " />
                            <span className="ml-2">Repositories</span>
                            <span className=" bg-white/10 rounded-2xl size-4.5 ml-2 text-center">{repos.length}</span>
                        </div>
                        <div className={`flex my-2 mx-3 cursor-pointer ${project && "text-white font-bold border-3 border-b-orange-400 border-x-0 border-t-0"}`}
                            onClick={onProjectClick}>
                            <FolderKanban className="size-4.5 " />
                            <span className="ml-2">Project</span>
                        </div>
                        <div className={`flex my-2 mx-3 cursor-pointer ${packages && "text-white font-bold border-3 border-b-orange-400 border-x-0 border-t-0"}`}
                            onClick={onPackageClick}>
                            <Box className="size-4.5 " />
                            <span className="ml-2">Package</span>
                        </div>
                        <div className={`flex my-2 mx-3 cursor-pointer ${stars && "text-white font-bold border-3 border-b-orange-400 border-x-0 border-t-0"}`}
                            onClick={onStarsClick}>
                            <Star className="size-4.5 " />
                            <span className="ml-2">Stars</span>
                        </div>
                    </div>

                    {overview && <Overview  repos={repos}/>}
                    {repositories && <Repositories />}
                    {project && <Project />}
                    {packages && <Packages />}
                    {stars && <Stars />}
                </div>
            </div>
        </div>
    );
}

const Overview = ({repos}) => {
    useEffect(()=>{},[repos])
    return (
        <>
            <div className="m-5">
                <h2 className="text-gray-300 font-sm mb-3 text-xl">
                    Popular repositories
                </h2>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {
                    repos.map((repo) => {
                        <Repo key={repo.id} repo={repo}/>
                    })
                    }
                </div>
            </div>
        </>
    );
};

const Repo = ({repo}) => {
    const [repon, setRepon] = useState({
  id: 172581071,
  node_id: "MDEwOlJlcG9zaXRvcnkxNzI1ODEwNzE=",
  name: ".github",
  full_name: "facebook/.github",
  private: false,
  owner: {
    login: "facebook",
    id: 69631,
    node_id: "MDEyOk9yZ2FuaXphdGlvbjY5NjMx",
    avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/facebook",
    html_url: "https://github.com/facebook",
    followers_url: "https://api.github.com/users/facebook/followers",
    following_url: "https://api.github.com/users/facebook/following{/other_user}",
    gists_url: "https://api.github.com/users/facebook/gists{/gist_id}",
    starred_url: "https://api.github.com/users/facebook/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/facebook/subscriptions",
    organizations_url: "https://api.github.com/users/facebook/orgs",
    repos_url: "https://api.github.com/users/facebook/repos",
    events_url: "https://api.github.com/users/facebook/events{/privacy}",
    received_events_url: "https://api.github.com/users/facebook/received_events",
    type: "Organization",
    user_view_type: "public",
    site_admin: false
  },
  html_url: "https://github.com/facebook/.github",
  description: "Default Community health files for Facebook projects",
  fork: false,
  url: "https://api.github.com/repos/facebook/.github",
  forks_url: "https://api.github.com/repos/facebook/.github/forks",
  keys_url: "https://api.github.com/repos/facebook/.github/keys{/key_id}",
  collaborators_url: "https://api.github.com/repos/facebook/.github/collaborators{/collaborator}",
  teams_url: "https://api.github.com/repos/facebook/.github/teams",
  hooks_url: "https://api.github.com/repos/facebook/.github/hooks",
  issue_events_url: "https://api.github.com/repos/facebook/.github/issues/events{/number}",
  events_url: "https://api.github.com/repos/facebook/.github/events",
  assignees_url: "https://api.github.com/repos/facebook/.github/assignees{/user}",
  branches_url: "https://api.github.com/repos/facebook/.github/branches{/branch}",
  tags_url: "https://api.github.com/repos/facebook/.github/tags",
  blobs_url: "https://api.github.com/repos/facebook/.github/git/blobs{/sha}",
  git_tags_url: "https://api.github.com/repos/facebook/.github/git/tags{/sha}",
  git_refs_url: "https://api.github.com/repos/facebook/.github/git/refs{/sha}",
  trees_url: "https://api.github.com/repos/facebook/.github/git/trees{/sha}",
  statuses_url: "https://api.github.com/repos/facebook/.github/statuses/{sha}",
  languages_url: "https://api.github.com/repos/facebook/.github/languages",
  stargazers_url: "https://api.github.com/repos/facebook/.github/stargazers",
  contributors_url: "https://api.github.com/repos/facebook/.github/contributors",
  subscribers_url: "https://api.github.com/repos/facebook/.github/subscribers",
  subscription_url: "https://api.github.com/repos/facebook/.github/subscription",
  commits_url: "https://api.github.com/repos/facebook/.github/commits{/sha}",
  git_commits_url: "https://api.github.com/repos/facebook/.github/git/commits{/sha}",
  comments_url: "https://api.github.com/repos/facebook/.github/comments{/number}",
  issue_comment_url: "https://api.github.com/repos/facebook/.github/issues/comments{/number}",
  contents_url: "https://api.github.com/repos/facebook/.github/contents/{+path}",
  compare_url: "https://api.github.com/repos/facebook/.github/compare/{base}...{head}",
  merges_url: "https://api.github.com/repos/facebook/.github/merges",
  archive_url: "https://api.github.com/repos/facebook/.github/{archive_format}{/ref}",
  downloads_url: "https://api.github.com/repos/facebook/.github/downloads",
  issues_url: "https://api.github.com/repos/facebook/.github/issues{/number}",
  pulls_url: "https://api.github.com/repos/facebook/.github/pulls{/number}",
  milestones_url: "https://api.github.com/repos/facebook/.github/milestones{/number}",
  notifications_url: "https://api.github.com/repos/facebook/.github/notifications{?since,all,participating}",
  labels_url: "https://api.github.com/repos/facebook/.github/labels{/name}",
  releases_url: "https://api.github.com/repos/facebook/.github/releases{/id}",
  deployments_url: "https://api.github.com/repos/facebook/.github/deployments",
  created_at: "2019-02-25T20:39:32Z",
  updated_at: "2026-01-07T22:51:14Z",
  pushed_at: "2023-11-02T06:05:19Z",
  git_url: "git://github.com/facebook/.github.git",
  ssh_url: "git@github.com:facebook/.github.git",
  clone_url: "https://github.com/facebook/.github.git",
  svn_url: "https://github.com/facebook/.github",
  homepage: null,
  size: 6,
  stargazers_count: 17,
  watchers_count: 17,
  language: null,
  has_issues: false,
  has_projects: true,
  has_downloads: true,
  has_wiki: false,
  has_pages: false,
  has_discussions: false,
  forks_count: 119,
  mirror_url: null,
  archived: true,
  disabled: false,
  open_issues_count: 0,
  license: null,
  allow_forking: true,
  is_template: false,
  web_commit_signoff_required: false,
  topics: [],
  visibility: "public",
  forks: 119,
  open_issues: 0,
  watchers: 17,
  default_branch: "main"
});

useEffect(()=>{

    setRepon(repo)
},[repo])
    return (
        <>
            <div className="border border-gray-500  rounded-xl p-3 relative text-gray-500">
                <div className="flex items-center">
                    <h3 className="text-blue-500 text-xl ">{repo.name}</h3>
                   {!repo.private && <div
                        className="border rounded-2xl h-5 px-2 right-0 top-0 text-sm ml-2"
                        style={{ fontSize: "12px" }}
                    >
                        Public
                    </div>}
                </div>
                <div>
                    <p className="mt-2">{repo.description} </p>
                </div>
                <div className="text-sm flex gap-4 mt-2 overflow-hidden">
                    <div className="flex items-center text-sm">
                        <div className="bg-orange-500 mr-1 size-3  rounded-2xl"></div>
                        <span>HTML</span>
                    </div>
                    <div className="flex items-center">

                        <Star className="mr-1 size-  rounded-2xl" />
                        <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center">
                        <GitFork className="mr-1 size-  rounded-2x" />
                        <span>{repo.forks_count}</span>
                    </div>
                </div>
            </div>
        </>
    );
};



const Repositories = () => {
    return (
        <>
            <div className="w-full mt-5 flex flex-col md:flex-row md:items-center border border-b-gray-500 border-x-0 border-t-0">
                <div className="flex-1 p-2 flex items-center">
                    <input type="text"
                        className="border border-gray-500 text-gray-100 placeholder:text-gray-500 text-sm  px-2 py-1 rounded-md w-full  "
                        placeholder="Find a repository.." />
                </div>
                <div className="flex p-2 gap-2">
                    <select className="border border-gray-500 h-min rounded font-light text-gray-100 px-2 py-1 bg-gray-500/50">
                        <option value="">Type</option>
                    </select>
                    <select className="border border-gray-500 rounded h-min font-light text-gray-100 px-2 py-1 bg-gray-500/50">
                        <option value="">Language</option>
                    </select>
                    <select className="border border-gray-500 rounded h-min font-light text-gray-100 px-2 py-1 bg-gray-500/50">
                        <option value="">Sort</option>
                    </select>
                </div>
            </div>
            <div>
                <Repos />
            </div>
        </>
    )
}


const Repos = () => {
    return (
        <>
             <div className="border border-gray-500 border-x-0 border-t-0   p-3 relative text-gray-500">
                <div className="flex items-center">
                    <h3 className="text-blue-500 text-xl ">Repo-name</h3>
                    <div
                        className="border rounded-2xl h-5 px-2 right-0 top-0 text-sm ml-2"
                        style={{ fontSize: "12px" }}
                    >
                        Public
                    </div>
                </div>
                <div>
                    <p className="mt-2">Description </p>
                </div>
                <div className="text-sm flex gap-4 mt-2 overflow-hidden">
                    <div className="flex items-center text-sm">
                        <div className="bg-orange-500 mr-1 size-3  rounded-2xl"></div>
                        <span>HTML</span>
                    </div>
                    <div className="flex items-center">

                        <Star className="mr-1 size-  rounded-2xl" />
                        <span>952</span>
                    </div>
                    <div className="flex items-center">
                        <GitFork className="mr-1 size-  rounded-2x" />
                        <span>35</span>
                    </div>
                </div>
            </div>
        </>
    )
};

const Project = () => {
    return (
        <>

        </>
    )
}

const Packages = () => {
    return (
        <>

        </>
    )
}

const Stars = () => {
    return (
        <>

        </>
    )
}