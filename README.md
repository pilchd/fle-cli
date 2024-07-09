fle-cli
=======

*CLI frontend for [fle][1]*

It's incredibly simple\*:

```
npm install -g @pilchd/fle-cli

cat log.txt | fle-cli > log.adi
cat log.txt | fle-cli -c > log.check.txt
```

`log.adi` is ready for use with Logbook of the World or similar; `log.check.txt` can be sent to a TTS program that will
read the critical fields of your log back to you, once per QSO.

\**Not because it has to be--because I'm focused on [fle][1], and this creates valid logs in the meantime!*

[1]: https://github.com/pilchd/fle
