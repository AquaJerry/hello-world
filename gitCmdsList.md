# A Glance at Git
This is a list of commands for beginners looking for how to use git.
## Lesson 1
	git help --all

	git init

	git add file-name
		git add src/*.c

	git status

	git commit --message="message" --author="author<email>"
		git commit -m "First commit" --author="Lee<Lee@gmail.com>"

	gitk

## Lesson 2
### commands
    git config --list --system|--global|--local

    git config object.key value --local|--global|--system
        git config --global user.name "Lee"
        git config --global core.editor emacs24

    git config --unset object.key
    git config alias.your_alias "existed commands and params"
        git config alias.con "config -l"
        git con
        git config --unset alias.con

    git diff
### notes
#### differences between files
	git diff

and you might get:

	 diff --git a/poem.txt b/poem.txt
	 index 88508a4..3a475a5 100644
	 --- a/poem.txt
	 +++ b/poem.txt
	 @@ -1,2 +1,4 @@
	 空山新雨后
	-天气晚来秋
	 \ No newline at end of file
	+天气晚来秋
	+明月松间照
	+清泉石上流
	 \ No newline at end of file

##### where are files
	a/poem.txt b/poem.txt
- a/poem.txt either in
	- index(adds)
	- repository(commits)
- b/poem.txt in
	- your working directory

##### where in files
	--- a/poem.txt
	+++ b/poem.txt
	@@ -1,2 +1,4 @@
Something in
- 2 lines starting from line 1 in a/poem.txt

changes into
- 4 lines starting from line 1 in b/poem.txt

##### where is deletion
	  -天气晚来秋
	  \ No newline at end of file"
deleted lines start with '-'

##### where is addition
	  +天气晚来秋
added lines start with '+'

## Lesson 3
### commands
	git status

	touch .gitignore

	git rm --cached "file name"

	git reset HEAD "file name"

	git rm "file name"
		git rm poem.txt

	git show "tag name"
		git show HEAD
		git show @
		git show HEAD^1
		git show HEAD~1
		git show HEAD^2
		git show HEAD~2
		git show HEAD^2^
		git show HEAD~3

	git tag "tag name" "existed tag name or patch id"
		git tag MY-TAG HEAD

	git tag --delete "existed tag name"
		git tag --delete MY-TAG

	git reset "existed tag name or patch id" "--soft|--mixed|--hard"
		git reset --mixed HEAD

### notes
#### see status
	git diff
to see status of files or directories.

There're 3 different status of files or directories:
- tracked
- ignored
- untracked

#### how do I update .gitignore
	touch .gitignore
or `echo > .gitignore`
#### cancel a commit request
If you typed "git init" but have not typed "git commit"

	git rm --cached "file name"
else if you typed "git commit"

	git reset HEAD "file name"
#### delete a file
Only do this after you make sure what you are doing.

	git rm poem.txt
and you might get:

	On branch master
	Changes to be committed:
	  (use "git reset HEAD <file>..." to unstage)

		deleted:    poem.txt

#### show my commits
##### latest
	    git show @       /* @ == HEAD */
##### earlier
	    /********************
	      1st parent of HEAD
	     ********************/
	    git show HEAD^1
	      /*
	        HEAD^1 ==
	          @^1        // HEAD == @
	          HEAD^      // a1 == a
	          @^
	      */
	    git show HEAD~1
	      /*
	        HEAD~1 ==
	          HEAD~      // a1 = a
	          @~
	          HEAD^1     // a~ == a^
	      */
##### more earlier
	    /********************
	      2nd parent of HEAD
	     ********************/
	    git show HEAD^2  /* HEAD^2 == @^2 */
##### much more earlier
	    /*********************
	      grandparent of HEAD
	     *********************/
	    git show HEAD~2
	      /*
	        HEAD~2 ==
	          HEAD~1~1   //           a~2 == a~1~1
	          HEAD~~     // a1 == a,  a~2 == a~~
	          HEAD^^     // a~ == a^, a~2 == a^^
	      */

	    // if 2nd parent of HEAD is child of grandparent of HEAD
	    git show HEAD^2^ /* HEAD^2^ == HEAD~2 */
##### and earlier
	    /*******************************
	      parent of grandparent of HEAD
	     *******************************/
	    git show HEAD~3  /* HEAD~3 == HEAD~2^ */

## Lesson 4
### commands
	git diff "file name"
		git diff poem.txt

	git diff "tag name 1 or patch id 1" "tag name 2 or patch id 2" "file name"
		git diff HEAD HEAD^ poem.txt

	git diff --no-index "file name 1" "file name 2"
		git diff poem.txt dairy.txt

	git diff "tag name or patch id" "filename"
		git diff HEAD poem.txt

	git diff --cached "file name"
		git diff --cached poem.txt

### notes
#### show differences
	git diff "file name"
or `git difftool "file name"`.

You can use `difftool` instead of `diff`.

	git diff poem.txt
will find all versions of poem.txt in
- repository(commits)
- index(adds)
- your working directory

##### only in commits
	git diff HEAD HEAD^ poem.txt
will only find two versions of poem.txt in
- repository

##### only in my works
	git diff poem.txt dairy.txt
will only find poem.txt and dairy.txt in
- your working directory

##### both in commits and my works
	git diff HEAD poem.txt
will find two versions of poem.txt respectively in
- repository
- your working directory

##### both in commits and my backup
	git diff --cached poem.txt
will find all versions of poem.txt in
- repository
- index

_TO BE CONTINUED_
